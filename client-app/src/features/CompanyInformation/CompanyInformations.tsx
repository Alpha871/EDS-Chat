import { useStore } from "@/app/store/store";
import Information from "@/components/shared/Information";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CompanyInformations() {
  const { informationStore } = useStore();
  const { getInformations, informations, clearInformations } = informationStore;

  useEffect(() => {
    getInformations();
    return () => clearInformations();
  }, [getInformations, clearInformations]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {informations.length > 0 ? (
        informations.map((info) => <Information key={info.id} info={info} />)
      ) : (
        <div className="flex flex-col flex-wrap gap-3 mt-4 items-end justify-end">
          <p className="text-white">No Information yet </p>
          <Button className="px-3 py-2 text-white bg-blue">
            <Link to="/addInformation"> Add information</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default observer(CompanyInformations);
