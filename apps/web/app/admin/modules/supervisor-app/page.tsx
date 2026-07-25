import { ModuleWorkspace } from "@/components/modules/module-workspace";
import { moduleConfigs } from "@/lib/module-client/configs";

export default function SupervisorAppModulePage() {
  return <ModuleWorkspace config={moduleConfigs.supervisorApp} />;
}
