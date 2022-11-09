'use client'

function ClientTestComponent({ children }: any) {
  return <div>{children} i am the client test component</div>;
}

ClientTestComponent.form = {
  children: {
    type: "string",
  },
};

export default ClientTestComponent;