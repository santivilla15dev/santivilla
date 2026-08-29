import { gasthausAmHofProfile } from "./profiles/gasthaus-am-hof";
import type { BotProfile } from "./types";

const profiles: Record<string, BotProfile> = {
  [gasthausAmHofProfile.id]: gasthausAmHofProfile,
};

export const DEMO_BOT_PROFILE_ID = gasthausAmHofProfile.id;

export function getBotProfile(id: string): BotProfile | null {
  return profiles[id] ?? null;
}
