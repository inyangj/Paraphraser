import Header from './Components/Header'
import './index.css'
import ApiCall from './Components/ApiCall'
import Nav from './Components/Nav'



function App() {

  return (
    <div className='bg-gradient-to-r from-[#151E2B] to-[#161820] h-full  w-screen p-7 sm:pb-16'>
      <Nav />
      <Header />
      <ApiCall />
    </div>
  )
}

export default App
