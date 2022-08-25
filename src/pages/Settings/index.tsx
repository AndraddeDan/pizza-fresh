import { RoutePath } from "types/routes";
import Menu from "components/Menu";
import NavColumn from "components/NavColumn";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "data/navigation";
import { Auth } from "helpers/Auth";
import * as S from "./style";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: RoutePath) => navigate(path);

  const { pathname } = useLocation();

  const splitterPath = (path: string) => path.split("/").pop() as RoutePath;
  const path = splitterPath(pathname);

  return (
    <S.Settings>
      <Menu
        active={RoutePath.SETTINGS}
        onNavigate={handleNavigation}
        navItems={navigationItems}
        onLogout={Auth.logout}
      />

      <S.SettingsPage>
        <header>
          <S.SettingsPageHeaderTitle>Configurações</S.SettingsPageHeaderTitle>
        </header>

        <S.SettingsContent>
          <S.SettingsContentSidebar>
            <NavColumn activeRoute={path} />
          </S.SettingsContentSidebar>

          <S.SettingsContentBox>
            {path === splitterPath(RoutePath.SETTINGS) ? (
              <S.SettingsContentBoxEmpty>Selecione uma categoria</S.SettingsContentBoxEmpty>
            ) : (
              <Outlet />
            )}
          </S.SettingsContentBox>
        </S.SettingsContent>
      </S.SettingsPage>
    </S.Settings>
  );
};

export default Settings;
