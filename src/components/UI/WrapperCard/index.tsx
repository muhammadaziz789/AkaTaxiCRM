import cls from './style.module.scss'

interface Props {
  children: any;
}

export const WrapperCard = ({ children }: Props) => {
  return <div className={`bg-white rounded-[12px] p-5 border border-[var(--border)] ${cls.card}`}>{children}</div>;
};
