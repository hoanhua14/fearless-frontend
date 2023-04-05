function createCard(name, description, pictureUrl, startDate, endDate, location) {
    return `
      <div class="card mb-5 shadow p-5">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
          <p class="card-text"><small class="text-muted">${startDate} - ${endDate}</small></p>
        </div>
      </div>
    `;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getDay();
    const year = date.getFullYear();
    return (`${month}/${day}/${year}`);
  }



window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error('Response not ok');
    } else {
        const data = await response.json();

        let columnIndex = 1;
        for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {

                const details = await detailResponse.json();

                const name = details.conference.name;
                const locationName = details.conference.location.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;
                const startDate = formatDate(details.conference.starts);
                const endDate = formatDate(details.conference.ends);
                const html = createCard(name, description, pictureUrl, startDate, endDate, locationName);
                const column = document.querySelector(`#column${columnIndex}`);

                column.innerHTML += html;
                console.log(details);


                columnIndex++;
                if (columnIndex > 3) {
                    columnIndex = 1;
                }
            }
        }
    }
    } catch (e) {
        //console.error('error',error);
    }
});
