$(document).ready(function () {
  $(".del-btn").click(function (e) {
    e.preventDefault();
    $target = $(e.target);
    const id = $target.attr("articleId");

    let confirmation = confirm("Are you sure?");

    if (!confirmation) return;

    fetch("article/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          $(`[id=${id}]`).remove();
        } else if (res.status === 400) {
          throw new Error();
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error) {
          $(`[id=${id}]`).prepend(`
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Something went wrong. Could not delete. Try again.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`);
        }
      });
  });
});
