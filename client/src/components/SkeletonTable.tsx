import { FC } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

type Props = {
  margin?: number;
  marginTop?: number;
};

const SkeletonTable: FC<Props> = ({ margin, marginTop }) => {
  const theme = useTheme();
  return (
    <Box
      style={{
        width: '100%',
        margin: theme.spacing(margin),
        marginTop: theme.spacing(marginTop),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'white',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        {new Array(5).fill('0').map((...arg) => {
          const [, colIndex] = arg;
          return (
            <Box
              style={{
                width: '20%',
                display: 'flex',
                minHeight: theme.spacing(4),
                padding: `0 ${theme.spacing(1)}`,
              }}
              key={colIndex}
            >
              <Skeleton width='100%' height={theme.spacing(3.6)} />
            </Box>
          );
        })}
      </Box>
      {new Array(10).fill('0').map((...arg) => {
        const [, rowIndex] = arg;
        return (
          <Box
            style={{
              display: 'flex',
              width: '100%',
              minHeight: theme.spacing(4),
              justifyContent: 'center',
              padding: `0 ${theme.spacing(1)}`,
            }}
            key={rowIndex}
          >
            <Skeleton width='100%' height={theme.spacing(3.5)} />
          </Box>
        );
      })}
    </Box>
  );
};

export default SkeletonTable;
