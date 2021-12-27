import useFetch from './useFetch';
const Home = () => {
    const { error, isPending, data: offers } = useFetch('http://localhost:8080/soa/api/offers')
    return (
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { offers && <p>{offers}</p> }
        </div>
    )
}
export default Home;