import { ModuleWorkspace } from "@/components/modules/module-workspace";
import { moduleConfigs } from "@/lib/module-client/configs";

export default function PlantNurseryPage() {
  return <ModuleWorkspace config={moduleConfigs.plantNursery} />;
}
