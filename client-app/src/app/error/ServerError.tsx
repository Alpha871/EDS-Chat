import { useStore } from "../store/store";

function ServerError() {
  const { commonStore } = useStore();
  const { error } = commonStore;

  return (
    <div>
      <h1>Server Error</h1>
      <p>{error?.message}</p>
      {commonStore.error?.details && (
        <div>
          <h4 className="text-teal-200">Stack trace</h4>
          <code style={{ marginTop: "10px" }}>{commonStore.error.details}</code>
        </div>
      )}
    </div>
  );
}

export default ServerError;
