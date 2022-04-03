import { FC, useEffect } from 'react';
import anime from 'animejs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

type EmptyDataProps = {
  text?: string;
};

const EmptyData: FC<EmptyDataProps> = ({ text }) => {
  const theme = useTheme();
  useEffect(() => {
    anime({
      targets: '#text',
      translateX: [-200, 0],
      scale: [10, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 500,
      delay: anime.stagger(500),
    });
    anime({
      targets: '#text',
      opacity: [0, 1],
      easing: 'easeOutElastic',
      duration: 1500,
      direction: 'alternate',
      loop: true,
    });
  }, []);

  return (
    <Box
      style={{
        display: 'flex',
        width: '100%',
        minHeight: theme.spacing(10),
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography id='text' variant='h6'>
        {text || 'No Records'}
      </Typography>
    </Box>
  );
};

export default EmptyData;
