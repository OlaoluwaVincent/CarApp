'use client';

interface Props {
	children: React.ReactNode;
}
const ClientComp = (props: Props) => {
	return <section>{props.children}</section>;
};
export default ClientComp;
