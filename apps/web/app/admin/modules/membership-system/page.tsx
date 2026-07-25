import { ModuleWorkspace } from "@/components/modules/module-workspace";
import { moduleConfigs } from "@/lib/module-client/configs";

export default function MembershipSystemPage() {
  return <ModuleWorkspace config={moduleConfigs.membershipSystem} />;
}
