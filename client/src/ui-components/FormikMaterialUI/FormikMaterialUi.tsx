/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import { Field } from 'formik';
import { TextField, TextFieldProps, Select, SelectProps } from 'formik-mui';
import { makeStyles } from '@utils/makeStyles';
import { FormControl, InputLabel, MenuItem } from '@mui/material';

export const FormikMuiTextField: React.FC<TextFieldProps> = (props) => <TextField {...props} />;

export interface ICatalogItem {
  id: string;
  description: string;
  displayText?: string;
  isDefault?: boolean;
}

export type Catalog = ICatalogItem[];

interface IFormikMuiSelectProps extends SelectProps {
  options: Catalog;
  idField?: string;
  getOptionLabel: (option) => string;
}

const useStyles = makeStyles()(() => ({
  selectHelperText: {
    marginLeft: '0px',
  },
}));

export const FormikMuiSelect: React.FC<IFormikMuiSelectProps> = (props) => {
  const { options, getOptionLabel, idField = 'id', label, ...rest } = props;

  const labelName = `${props.field.name}-label`;

  const variant = 'standard';

  const [focused, setFocused] = useState(false);

  const { classes } = useStyles();

  return (
    <FormControl fullWidth variant={variant}>
      <InputLabel shrink={props.field.value || focused} id={labelName}>
        {props.label}
      </InputLabel>
      <Field
        component={Select}
        variant={variant}
        labelId={labelName}
        formHelperText={{
          classes: {
            root: classes.selectHelperText,
          },
        }}
        {...rest}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={(event) => {
          setFocused(false);
          props.field.onBlur(event);
        }}
      >
        {options.map((option) => (
          <MenuItem value={option[idField]} key={option[idField]}>
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  );
};
