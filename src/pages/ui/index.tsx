import { Typography } from "@/components/ui/dataDisplay/typography";
import Box from "@/components/ui/layout/box";
import bg from "@/assets/images/uikit_bg.png";
import type { ReactNode } from "react";
import TextField from "@/components/ui/inputs/textField";
import Select, { type ItemSelect } from "@/components/ui/inputs/select";
import { Helper } from "@/utils/helper";
import Autocomplete from "@/components/ui/inputs/autocomplete";

type TWrapperProps = {
  title: string;
  children: ReactNode;
};
function Wrapper(props: TWrapperProps) {
  return (
    <Box className="backdrop-blur-lg rounded-lg bg-white/10">
      <Box className="bg-white/10 rounded-t-lg p-4">
        <Typography.Headings className="text-[18px]" type="h4">
          {props.title}
        </Typography.Headings>
      </Box>
      <Box className="p-4 flex flex-col gap-4">{props.children}</Box>
    </Box>
  );
}
const options: ItemSelect[] = [
  {
    label: "Option 1",
    value: Helper.randomKey(),
  },
  {
    label: "Option 2",
    value: Helper.randomKey(),
  },
  {
    label: "Option 3",
    value: Helper.randomKey(),
  },
];
function UI_KIT() {
  return (
    <Box
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="w-full bg-cover relative bg-center bg-no-repeat p-4 min-h-screen h-full"
    >
      <Box className="w-full max-w-[1440px] m-auto h-full">
        <Typography.Headings className="text-start text-white">
          UI-KIT | Thunder Team
        </Typography.Headings>
        <Wrapper title="Inputs">
          <Box>
            <Typography.Headings type="h5" className="text-[18px]">
              1. Textfile
            </Typography.Headings>
            <Box className="px-3">
              <Box className="p-3 grid grid-cols-3 gap-x-4 gap-y-10">
                <TextField
                  maxLength={100}
                  label="Basic"
                  clear
                  placeholder="Enter..."
                />
                <TextField
                  messageError="This filed required"
                  label="Error"
                  placeholder="Enter..."
                />
                <TextField
                  label="Clear"
                  defaultValue="Can change icon clear..."
                  clear
                  placeholder="Enter..."
                />
                <TextField disabled label="Disable" />
                <TextField
                  icon={{
                    direction: "start",
                    node: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18 4.2H6C5.00589 4.2 4.2 5.00589 4.2 6V14.9515L5.44438 13.7071C6.30353 12.8479 7.6965 12.8479 8.55565 13.7071L9.71717 14.8686C9.87338 15.0248 10.1267 15.0248 10.2829 14.8686L13.1615 11.9899C14.1766 10.9749 15.8219 10.9733 16.8376 11.989L19.8 14.9514V6C19.8 5.00589 18.9941 4.2 18 4.2ZM4.2 18V16.6485L6.29291 14.5556C6.68343 14.1651 7.3166 14.1651 7.70712 14.5556L8.86865 15.7171C9.49348 16.342 10.5065 16.342 11.1314 15.7171L14.0101 12.8385C14.5572 12.2914 15.4427 12.2912 15.9891 12.8376L16.1962 13.0446L16.2014 13.0499L16.2085 13.057L19.8 16.6485V18C19.8 18.9941 18.9941 19.8 18 19.8H6C5.00589 19.8 4.2 18.9941 4.2 18ZM6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3ZM9.8 8.4C9.8 9.1732 9.1732 9.8 8.4 9.8C7.6268 9.8 7 9.1732 7 8.4C7 7.6268 7.6268 7 8.4 7C9.1732 7 9.8 7.6268 9.8 8.4Z"
                          fill="#141415"
                        />
                      </svg>
                    ),
                  }}
                  label="Icon start"
                  placeholder="Enter..."
                />
                <TextField
                  icon={{
                    direction: "end",
                    node: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18 4.2H6C5.00589 4.2 4.2 5.00589 4.2 6V14.9515L5.44438 13.7071C6.30353 12.8479 7.6965 12.8479 8.55565 13.7071L9.71717 14.8686C9.87338 15.0248 10.1267 15.0248 10.2829 14.8686L13.1615 11.9899C14.1766 10.9749 15.8219 10.9733 16.8376 11.989L19.8 14.9514V6C19.8 5.00589 18.9941 4.2 18 4.2ZM4.2 18V16.6485L6.29291 14.5556C6.68343 14.1651 7.3166 14.1651 7.70712 14.5556L8.86865 15.7171C9.49348 16.342 10.5065 16.342 11.1314 15.7171L14.0101 12.8385C14.5572 12.2914 15.4427 12.2912 15.9891 12.8376L16.1962 13.0446L16.2014 13.0499L16.2085 13.057L19.8 16.6485V18C19.8 18.9941 18.9941 19.8 18 19.8H6C5.00589 19.8 4.2 18.9941 4.2 18ZM6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3ZM9.8 8.4C9.8 9.1732 9.1732 9.8 8.4 9.8C7.6268 9.8 7 9.1732 7 8.4C7 7.6268 7.6268 7 8.4 7C9.1732 7 9.8 7.6268 9.8 8.4Z"
                          fill="#141415"
                        />
                      </svg>
                    ),
                  }}
                  label="Icon end"
                  placeholder="Enter..."
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography.Headings type="h5" className="text-[18px]">
              2. Select
            </Typography.Headings>
            <Box className="px-3">
              <Box className="p-3 grid grid-cols-3 gap-x-4 gap-y-10">
                <Select label="Basic" placeholder="Enter..." data={options} />
                <Select
                  defaultSelect={options[0]}
                  label="Default value is option 1"
                  placeholder="Enter..."
                  data={options}
                />
                <Select
                  disabled
                  defaultSelect={options[0]}
                  label="Disabled"
                  placeholder="Enter..."
                  data={options}
                />
                <Select
                  messageError="This filed required"
                  label="Disabled"
                  placeholder="Enter..."
                  data={options}
                />
                <Autocomplete label="Auto complete" data={options} />
              </Box>
            </Box>
          </Box>
        </Wrapper>
      </Box>
    </Box>
  );
}

export default UI_KIT;
