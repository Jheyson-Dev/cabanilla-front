import moment from "moment";

interface DateFormatedProps {
  date: Date | undefined;
}

export const DateFormated: React.FC<DateFormatedProps> = ({ date }) => {
  return <span>{moment(date).format("DD/MM/YYYY")}</span>;
};
