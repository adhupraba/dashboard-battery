import { FC } from "react";
import { useParams } from "react-router-dom";
import { Title } from "src/components";

interface IEmptyPageProps {}

type Params = {
  slug: string;
};

export const EmptyPage: FC<IEmptyPageProps> = () => {
  const params = useParams() as Params;

  return <Title title={params.slug.replaceAll("-", " ")} />;
};
