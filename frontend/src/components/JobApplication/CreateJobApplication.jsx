import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CreateJobApplication from '../../api/JobApplication/CreateJobApplication';


function CreateJobApplicationPage() {  
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    try {
      await CreateJobApplication(
        Cookies.get('id'),
        Cookies.get('access_token'),
        id
      );
      navigate('/AllVacancies'); 
    } catch (error) {
      console.error('Error creating resume:', error);
      alert('Error creating resume. Please try again.');
    }
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Создать заявку</h1>
        <div
          style={{ marginTop: '140px', width: '100%' }}
          className="d-flex flex-wrap justify-content-center border-primary rounded-3"
        >
          <form
            className="mb-4 mt-2 p-3 form-control border-primary border rounded"
            style={{ width: '30%', margin: '10px', boxShadow: '5px 10px 8px rgba(0, 0, 1, .3)' }}
          >
            <p className="mt-3">Вы точно хотите создать заявку?</p>
            <button className="btn btn-primary mt-3" onClick={buttonClick}>
                Создать
            </button>

            <button className="btn btn-secondary mt-3 ms-3" onClick={() => navigate(`/VacancyDetail/?id=${id}`)}>
                Отмена
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJobApplicationPage;
