import Navbar from '../components/Navbar';
import PageWithNavbar from '../components/PageWithNavbar';

const Home = () => {
    return (
        <PageWithNavbar>
            <div className="w-full bg-off-white min-h-[100vh]">
                <p className="text-blue">Hello!</p>
            </div>
        </PageWithNavbar>
    );
};

export default Home;
