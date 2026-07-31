"use server";

import { sendConversionToRD } from "@/lib/rd-station";

export async function submitCtaForm(formData: FormData) {
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const capital = formData.get("capital") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const profile = formData.get("profile") as string;
  const prazo = formData.get("prazo") as string;
  const conhecimento = formData.get("conhecimento") as string;
  const utmSource = formData.get("utm_source") as string;
  const utmMedium = formData.get("utm_medium") as string;
  const utmCampaign = formData.get("utm_campaign") as string;
  const utmContent = formData.get("utm_content") as string;
  const utmTerm = formData.get("utm_term") as string;
  const eventId = formData.get("event_id") as string;

  let leadId: string | undefined;

  try {
    const result = await sendConversionToRD({
      name,
      email,
      personalPhone: whatsapp.replace(/\D/g, ""),
      state,
      city,
      trafficSource: utmSource || "site",
      capital,
      profile,
      prazo,
      conhecimento,
      eventId,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
    });
    leadId = result.leadId;
  } catch (error) {
    console.error("Falha ao enviar lead para o RD Station:", error);
    return { success: false, message: "Não foi possível enviar seu cadastro. Tente novamente." };
  }

  console.log("Lead enviado ao RD Station:", { city, state, capital, profile, prazo, conhecimento, name, email, whatsapp, leadId });

  return { success: true, message: "Cadastro recebido com sucesso!", leadId };
}
