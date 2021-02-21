import { ReactElement } from 'react';

export const EMMNASponsor = (): ReactElement => {
  return (
    <div className="flex flex-row items-center justify-center w-auto m-2">
      <img src="/EMMNALogo.png" alt="EMMNA-logo" className="w-20" />
      <div className="align-center justify-center">
        England Men&apos;s and Mixed Netball Association are offering a hoodie
        for the winner and bobble hat for the runner up! They aim to increase
        male and mixed participation in netball. Find out more{' '}
        <a href="https://www.linktr.ee/EMMNA" className="text-red-500">
          here.
        </a>
      </div>
    </div>
  );
};
