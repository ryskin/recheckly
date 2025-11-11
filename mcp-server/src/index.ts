#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// Types
type Priority = "P0" | "P1" | "P2" | "P3";
type TestType = "smoke" | "functional" | "regression" | "integration" | "performance" | "security";

interface TestStep {
  n: number;
  action: string;
  expected: string;
}

interface TestCase {
  id: string;
  title: string;
  priority: Priority;
  type: TestType;
  steps: TestStep[];
  affectedFiles?: string[]; // Связь с файлами кода
  createdBy?: "mcp" | "manual";
  createdAt: string;
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  caseIds: string[];
  createdAt: string;
}

interface TestRun {
  id: string;
  name: string;
  suiteId: string;
  status: "draft" | "in_progress" | "completed";
  assignedTo?: string;
  createdAt: string;
}

// Database (simple JSON files)
const DB_DIR = process.env.RECHECKLY_DB || join(process.cwd(), ".recheckly");
const CASES_FILE = join(DB_DIR, "cases.json");
const SUITES_FILE = join(DB_DIR, "suites.json");
const RUNS_FILE = join(DB_DIR, "runs.json");

// Ensure DB directory exists
if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true });
}

// Helper functions
function readData<T>(file: string): T[] {
  try {
    if (!existsSync(file)) return [];
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

function writeData<T>(file: string, data: T[]): void {
  writeFileSync(file, JSON.stringify(data, null, 2));
}

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// MCP Server
const server = new Server(
  {
    name: "recheckly",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tools definition
const tools: Tool[] = [
  {
    name: "create_test_case",
    description: "Create a new test case. Use this when code changes require new tests or when analyzing features that need testing.",
    inputSchema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Test case title (e.g., '[Auth] Login with valid credentials')",
        },
        priority: {
          type: "string",
          enum: ["P0", "P1", "P2", "P3"],
          description: "Priority: P0 (critical), P1 (high), P2 (medium), P3 (low)",
        },
        type: {
          type: "string",
          enum: ["smoke", "functional", "regression", "integration", "performance", "security"],
          description: "Test type",
        },
        steps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              action: { type: "string", description: "What to do" },
              expected: { type: "string", description: "What should happen" },
            },
            required: ["action", "expected"],
          },
          description: "Test steps",
        },
        affectedFiles: {
          type: "array",
          items: { type: "string" },
          description: "List of code files that this test covers (for traceability)",
        },
      },
      required: ["title", "priority", "type", "steps"],
    },
  },
  {
    name: "create_test_suite",
    description: "Create a test suite (group of test cases)",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Suite name" },
        description: { type: "string", description: "Suite description" },
        caseIds: {
          type: "array",
          items: { type: "string" },
          description: "IDs of test cases to include",
        },
      },
      required: ["name", "description", "caseIds"],
    },
  },
  {
    name: "create_test_run",
    description: "Create a test run from a suite",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Run name (e.g., 'Sprint 23 - Auth')" },
        suiteId: { type: "string", description: "Test suite ID" },
        assignedTo: { type: "string", description: "Tester name (optional)" },
      },
      required: ["name", "suiteId"],
    },
  },
  {
    name: "list_test_cases",
    description: "List all test cases, optionally filter by affected files",
    inputSchema: {
      type: "object",
      properties: {
        affectedFile: {
          type: "string",
          description: "Filter by affected file path",
        },
      },
    },
  },
  {
    name: "get_affected_tests",
    description: "Get test cases that should be re-tested based on changed files",
    inputSchema: {
      type: "object",
      properties: {
        changedFiles: {
          type: "array",
          items: { type: "string" },
          description: "List of changed file paths",
        },
      },
      required: ["changedFiles"],
    },
  },
];

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    return {
      content: [{ type: "text", text: "Error: Missing arguments" }],
      isError: true,
    };
  }

  try {
    switch (name) {
      case "create_test_case": {
        const cases = readData<TestCase>(CASES_FILE);
        const newCase: TestCase = {
          id: generateId("case"),
          title: args.title as string,
          priority: args.priority as Priority,
          type: args.type as TestType,
          steps: (args.steps as any[]).map((s, i) => ({
            n: i + 1,
            action: s.action,
            expected: s.expected,
          })),
          affectedFiles: args.affectedFiles as string[] | undefined,
          createdBy: "mcp",
          createdAt: new Date().toISOString(),
        };
        cases.push(newCase);
        writeData(CASES_FILE, cases);

        return {
          content: [
            {
              type: "text",
              text: `✅ Test case created:\nID: ${newCase.id}\nTitle: ${newCase.title}\nPriority: ${newCase.priority}\nSteps: ${newCase.steps.length}\n\nYou can view it in Recheckly UI at /cases`,
            },
          ],
        };
      }

      case "create_test_suite": {
        const suites = readData<TestSuite>(SUITES_FILE);
        const newSuite: TestSuite = {
          id: generateId("suite"),
          name: args.name as string,
          description: args.description as string,
          caseIds: args.caseIds as string[],
          createdAt: new Date().toISOString(),
        };
        suites.push(newSuite);
        writeData(SUITES_FILE, suites);

        return {
          content: [
            {
              type: "text",
              text: `✅ Test suite created:\nID: ${newSuite.id}\nName: ${newSuite.name}\nCases: ${newSuite.caseIds.length}\n\nView at /suites`,
            },
          ],
        };
      }

      case "create_test_run": {
        const runs = readData<TestRun>(RUNS_FILE);
        const newRun: TestRun = {
          id: generateId("run"),
          name: args.name as string,
          suiteId: args.suiteId as string,
          status: "draft",
          assignedTo: args.assignedTo as string | undefined,
          createdAt: new Date().toISOString(),
        };
        runs.push(newRun);
        writeData(RUNS_FILE, runs);

        return {
          content: [
            {
              type: "text",
              text: `✅ Test run created:\nID: ${newRun.id}\nName: ${newRun.name}\n${args.assignedTo ? `Assigned to: ${args.assignedTo}\n` : ""}\nStart testing at: /runs/${newRun.id}`,
            },
          ],
        };
      }

      case "list_test_cases": {
        const cases = readData<TestCase>(CASES_FILE);
        const filtered = args.affectedFile
          ? cases.filter((c) => c.affectedFiles?.includes(args.affectedFile as string))
          : cases;

        return {
          content: [
            {
              type: "text",
              text: `Found ${filtered.length} test case(s):\n\n${filtered
                .map(
                  (c) =>
                    `• ${c.id}: ${c.title} [${c.priority}/${c.type}]\n  Steps: ${c.steps.length}${c.affectedFiles ? `\n  Files: ${c.affectedFiles.join(", ")}` : ""}`
                )
                .join("\n\n")}`,
            },
          ],
        };
      }

      case "get_affected_tests": {
        const cases = readData<TestCase>(CASES_FILE);
        const changedFiles = args.changedFiles as string[];
        const affected = cases.filter((c) =>
          c.affectedFiles?.some((f) => changedFiles.includes(f))
        );

        return {
          content: [
            {
              type: "text",
              text: affected.length > 0
                ? `⚠️ ${affected.length} test case(s) should be re-tested:\n\n${affected
                    .map(
                      (c) =>
                        `• ${c.id}: ${c.title} [${c.priority}]\n  Affected by: ${c.affectedFiles?.filter((f) => changedFiles.includes(f)).join(", ")}`
                    )
                    .join("\n\n")}\n\nRecommendation: Create a test run for these cases.`
                : `✅ No tests are directly affected by these changes.`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Recheckly MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
