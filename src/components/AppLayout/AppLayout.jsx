import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar
} from 'react95';
import styled from 'styled-components';
import Search from '../Search';
import logoIMG from '../../assets/logo.png';
import { blogIcon, mailIcon } from '../../assets/icons';

const Wrapper = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.desktopBackground};
  flex: 1;
`;

const propTypes = {
  children: PropTypes.element.isRequired
}

const AppLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Wrapper>
        {children}
      </Wrapper>
      <AppBar>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
              style={{ fontWeight: 'bold' }}
            >
              <img
                src={logoIMG}
                alt='react95 logo'
                style={{ height: '20px', marginRight: 4 }}
              />
              Start
            </Button>
            {open && (
              <MenuList
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '100%'
                }}
                onClick={() => setOpen(false)}
              >
                <MenuListItem>
                  <a
                    href="https://mail.google.com/"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img
                      src={mailIcon}
                      alt='Windows 95 mail icon'
                      style={{ width: '20px' }}
                    />
                    <div>Email</div>
                  </a>
                </MenuListItem>
                <MenuListItem>
                  <a
                    href="https://andrewgivens.net/blog"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img
                      src={blogIcon}
                      alt='Windows 95 computer icon'
                      style={{ width: '20px' }}
                    />
                    <div>Blog</div>
                  </a>
                </MenuListItem>
                <Separator />
                <MenuListItem disabled>
                  <span role='img' aria-label='🔙'>
                    🔙
                  </span>
                  Logout
                </MenuListItem>
              </MenuList>
            )}
          </div>

          <Search />
        </Toolbar>
      </AppBar>
    </>
  );
}

AppLayout.propTypes = propTypes;

export default AppLayout;
