import './App.css';
import { Box } from '@chakra-ui/react';
import AllRoutes from './routes/AllRoutes';
import  Navbar  from './components/HomePage/Navbar/Navbar';
import  Footer  from './components/HomePage/Footer/Footer';

function App() {
  return (
    <Box className="App">
      <Navbar />
      <AllRoutes />
      <Footer />


    </Box>
  );
}

export default App;