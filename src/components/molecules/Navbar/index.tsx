import { ReactElement } from 'react';

const Navbar = (): ReactElement => {
    return (
        <nav className="flex items-center justify-between min-h-[7vh] px-4">
            <div>
                <h1 className="text-2xl">Squid <span className="font-bold">Golf</span></h1>
            </div>
        </nav>
    );
};

export default Navbar;
