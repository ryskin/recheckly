import { NextResponse } from "next/server";

// Демо-данные (в реальном приложении это будет БД)
const mockData: Record<string, any> = {
  demo: {
    suite: {
      cases: [
        {
          id: "c1",
          title: "[Auth] Login with valid creds",
          priority: "P0",
          type: "smoke",
          steps: [
            { n: 1, action: "Open app", expected: "Home visible" },
            { n: 2, action: "Go Login", expected: "Login visible" },
            {
              n: 3,
              action: "Enter creds & Submit",
              expected: "Dashboard visible",
            },
          ],
        },
        {
          id: "c2",
          title: "[Auth] Wrong password error",
          priority: "P0",
          type: "smoke",
          steps: [
            { n: 1, action: "Open app", expected: "Home visible" },
            { n: 2, action: "Go Login", expected: "Login visible" },
            { n: 3, action: "Enter wrong creds", expected: "Error toast" },
          ],
        },
        {
          id: "c3",
          title: "[Auth] Logout functionality",
          priority: "P1",
          type: "regression",
          steps: [
            { n: 1, action: "Login to app", expected: "Dashboard visible" },
            { n: 2, action: "Click Logout", expected: "Redirect to login" },
            {
              n: 3,
              action: "Try to access dashboard",
              expected: "Redirect to login",
            },
          ],
        },
        {
          id: "c4",
          title: "[Profile] Update user profile",
          priority: "P2",
          type: "functional",
          steps: [
            { n: 1, action: "Login to app", expected: "Dashboard visible" },
            { n: 2, action: "Go to Profile", expected: "Profile page visible" },
            {
              n: 3,
              action: "Update name and save",
              expected: "Success message shown",
            },
          ],
        },
        {
          id: "c5",
          title: "[API] Data fetching performance",
          priority: "P2",
          type: "performance",
          steps: [
            { n: 1, action: "Login to app", expected: "Dashboard visible" },
            {
              n: 2,
              action: "Navigate to data page",
              expected: "Data loads within 2s",
            },
            {
              n: 3,
              action: "Refresh the page",
              expected: "Cache works correctly",
            },
          ],
        },
        {
          id: "c6",
          title: "[Settings] Change password",
          priority: "P1",
          type: "security",
          steps: [
            { n: 1, action: "Login to app", expected: "Dashboard visible" },
            {
              n: 2,
              action: "Go to Settings",
              expected: "Settings page visible",
            },
            {
              n: 3,
              action: "Enter old & new password",
              expected: "Password changed",
            },
            {
              n: 4,
              action: "Logout and login with new password",
              expected: "Login successful",
            },
          ],
        },
      ],
    },
    results: {},
  },
};

export async function GET(
  request: Request,
  context: { params: Promise<{ runId: string }> }
) {
  const { runId } = await context.params;

  // Получаем данные из "БД" (в реальности это будет запрос к БД)
  const payload = mockData[runId] || mockData.demo;

  return NextResponse.json(payload);
}
