import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccordionIcon from '@mui/icons-material/ExpandMore';
import BadgeIcon from '@mui/icons-material/AssignmentTurnedIn';
import AvatarIcon from '@mui/icons-material/Person';
import TypographyIcon from '@mui/icons-material/TextFields';
import ButtonIcon from '@mui/icons-material/TouchApp';
import CheckboxIcon from '@mui/icons-material/CheckBox';
import GridIcon from '@mui/icons-material/ViewComfy';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccordionIcon />
            </ListItemIcon>
            <ListItemText primary="Accordion" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Badges" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AvatarIcon />
            </ListItemIcon>
            <ListItemText primary="Avatars" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TypographyIcon />
            </ListItemIcon>
            <ListItemText primary="Typography" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ButtonIcon />
            </ListItemIcon>
            <ListItemText primary="Buttons" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CheckboxIcon />
            </ListItemIcon>
            <ListItemText primary="Checkboxes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GridIcon />
            </ListItemIcon>
            <ListItemText primary="Grids" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Show categories</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
