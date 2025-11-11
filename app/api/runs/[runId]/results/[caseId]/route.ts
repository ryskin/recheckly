import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ runId: string; caseId: string }> }
) {
  const { runId, caseId } = await context.params;
  const body = await request.json();

  // В реальном приложении здесь будет сохранение в БД
  console.log(`[API] Updating case ${caseId} in run ${runId}:`, body);

  // Имитируем успешное сохранение
  return NextResponse.json({ ok: true, runId, caseId, data: body });
}
