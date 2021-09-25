import { useIsFetching } from "react-query";

export default function FetchingIndicator() {
  const isFetching = useIsFetching();

  return (
    <img
      src="/spinner.gif"
      width="20"
      className="spinner"
      style={{
        opacity: isFetching ? 1 : 0,
      }}
    />
  );
}
