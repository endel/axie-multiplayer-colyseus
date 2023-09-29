import {
  AxieStarter,
  Buba,
  Pomodoro,
  Puffy,
} from "@sms0nhaaa/r3f-axie-starter";

interface AxieProps {
  name: AxieStarter;
  animation: string;
}

export default function Axie({
  name,
  animation,
  ...props
}: AxieProps & JSX.IntrinsicElements["group"]) {
  return (
    <>
      {
        {
          buba: (
            <Buba
              animation={animation}
              scale={[0.25, 0.25, 0.25]}
              outline={{ color: "black", opacity: 1, thickness: 0.03 }}
              {...props}
            />
          ),
          pomodoro: (
            <Pomodoro
              animation={animation}
              scale={[0.25, 0.25, 0.25]}
              outline={{ color: "black", opacity: 1, thickness: 0.03 }}
              {...props}
            />
          ),
          puffy: (
            <Puffy
              animation={animation}
              scale={[0.25, 0.25, 0.25]}
              outline={{ color: "black", opacity: 1, thickness: 0.03 }}
              {...props}
            />
          ),
        }[name]
      }
    </>
  );
}
