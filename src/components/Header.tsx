type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: HeaderProps) {
  return <header className="header__top">{children}</header>;
}
