export type CaseStatus = "PASS" | "FAIL" | "BLOCKED" | "SKIP" | "NONE";

export type TestStep = {
  n: number;
  action: string;
  expected: string;
};

export type TestModule =
  | "Smoke Tests"
  | "Test Cases"
  | "Test Suites"
  | "Test Runs"
  | "Dashboard"
  | "UI/UX"
  | "Integration"
  | "Performance"
  | "Security"
  | "Onboarding";

export type TestCase = {
  id: string;
  title: string;
  priority: "P0" | "P1" | "P2" | "P3";
  type: string;
  module?: TestModule;
  steps: TestStep[];
};

export type Evidence = {
  kind: "screenshot";
  url: string;
  name?: string;
};

export type CaseResult = {
  status: CaseStatus;
  notes?: string;
  evidence?: Evidence[];
};

export type RunPayload = {
  suite: { cases: TestCase[] };
  results: Record<string, CaseResult>;
};

export type FilterType = "ALL" | "P0" | "P1" | "P2" | "P3" | "FAIL" | "PENDING";
