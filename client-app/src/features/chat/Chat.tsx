import PromptArea from "@/components/shared/PromtArea";

import { useStore } from "@/app/store/store";
import { observer } from "mobx-react-lite";

function Chat() {
  const { companyStore, informationStore } = useStore();

  const { company } = companyStore;
  const { gsInformation } = informationStore;

  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     await getCompanies();
  //   };
  //   fetchCompanies();
  // }, [getCompanies]);

  if (company.length === 0) return null;

  console.log("information", gsInformation);

  return (
    <section className="flex flex-col">
      <PromptArea
        instructions={company[0].instructions}
        informations={gsInformation}
      />
    </section>
  );
}

export default observer(Chat);
