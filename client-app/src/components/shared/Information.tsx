import { InformationInput } from "@/app/models/information";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "../ui/button";
import DeleteCompanyInformation from "@/features/CompanyInformation/DeleteCompanyInformation";

interface Props {
  info: InformationInput;
}

function truncateText(text: string) {
  const maxLength = 200;
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

function Information({ info }: Props) {
  return (
    <div className="flex flex-col p-4 bg-gem-AI-1 rounded-lg text-white">
      <p className=" mb-3 ">
        Created at :
        <span className="text-small-regular">
          {" "}
          {format(info.createdAt, "dd MMM yyyy h:mm aa")}
        </span>
      </p>
      <div className="text-body-semibold mb-3">
        {truncateText(info.information)}
      </div>
      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-3 text-small-regular  flex-wrap justify-end ">
          <Button className="px-2 py-1 bg-green-400 text-white">
            <Link to={`/updateInformation/${info.id}`}>Update</Link>
          </Button>
          <DeleteCompanyInformation id={info.id} />
        </div>
      </div>
    </div>
  );
}

export default Information;
