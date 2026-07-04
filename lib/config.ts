// Constantes globais vindas de variáveis de ambiente (NEXT_PUBLIC_* são
// embutidas no bundle durante o build). Fallbacks mantêm o site funcional
// caso as variáveis não estejam definidas.

export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP || '5551995622999'
).replace(/\D/g, '');

export const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || '';

/** Monta um link wa.me com a mensagem já codificada. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
