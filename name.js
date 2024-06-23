document.addEventListener("DOMContentLoaded", () => {
  const wordElement = document.getElementById("word");
  const fullName = " FAVOUR  OMIRIN";
  const firstName = " FAVOUR";
  let currentWord = fullName;

  function animateWord(word) {
    wordElement.innerHTML = "";
    word.split("").forEach((letter, index) => {
      const span = document.createElement("span");
      if (letter === " ") {
        span.innerHTML = "&nbsp;"; // Use a non-breaking space for the space character
      } else {
        span.innerText = letter;
      }
      span.style.animationDelay = `${index * 0.5}s`;
      wordElement.appendChild(span);
    });
  }

  function cycleWords() {
    setTimeout(() => {
      currentWord = currentWord === fullName ? firstName : fullName;
      animateWord(currentWord);
      cycleWords();
    }, currentWord.length * 100 + 6000); // Length of word * animation delay + pause time
  }

  animateWord(currentWord);
  cycleWords();
});

function react() {
  window.open("https://repository-navigator.netlify.app/", "_blank");
}
function vue() {
  window.open("https://github-repository-navigator.netlify.app/", "_blank");
}
function github() {
  window.open("https://github.com/Modred14", "_blank");
}

document.getElementById("colorLink").addEventListener("click", function () {
  var link = this;
  setTimeout(function () {
    link.classList.add("clicked");
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("comment-form");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
  const commentsList = document.getElementById("comments-list");
  const noCommentsText = document.getElementById("no-comments");

  const baseURL = 'https://favour-omirin.onrender.com'; 

  async function fetchComments() {
      const response = await fetch(`${baseURL}/comments`);
      const comments = await response.json();
      updateComments(comments);
  }

  commentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = nameInput.value.trim();
      const commentText = commentInput.value.trim();
      if (name && commentText) {
          const response = await fetch(`${baseURL}/comments`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, text: commentText }),
          });
          await response.json();
          fetchComments();
          nameInput.value = "";
          commentInput.value = "";
          if(response.ok){
          alert("Your comment has been submitted successfully.")}
          else{
            alert("There was an error submitting your comment. Please try again.")
          }
      }
  });

  async function deleteComment(index) {
      const confirmed = confirm("This action will delete this comment. Click Cancel to cancel.");
      if (confirmed) {
          await fetch(`${baseURL}/comments/${index}`, {
              method: 'DELETE',
          });
          fetchComments();
          alert(`You have succesfully deleted the comment.`)
      }
  }

  function updateComments(comments) {
      if (comments.length === 0) {
          noCommentsText.style.display = "block";
          commentsList.style.display = "none";
      } else {
          noCommentsText.style.display = "none";
          commentsList.style.display = "block";
          commentsList.innerHTML = comments
              .map(
                  (comment, index) =>
                      `<li>
                          <div>
                              <span class="comment-author">${comment.name}:</span>
                              <span class="comment-text">${comment.text}</span>
                          </div>
                          <button class="delete-button" onclick="deleteComment(${index})">Delete</button>
                      </li>`
              )
              .join("");
      }
  }

  window.deleteComment = deleteComment;
  fetchComments();
});