import { ModuleWorkspace } from "@/components/modules/module-workspace";
import { moduleConfigs } from "@/lib/module-client/configs";

export default function AiPlantDoctorModulePage() {
  return <ModuleWorkspace config={moduleConfigs.aiPlantDoctor} />;
}
