// Функция для добавления пользователя в localStorage
function addUser(username, realName) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, realName });
  localStorage.setItem("users", JSON.stringify(users));
}

// Функция для показа кнопок подтверждения
function showConfirmationButtons() {
  const confirmationButtons = document.getElementById("confirmationButtons");
  confirmationButtons.style.display = "block"; // Показываем кнопки
}

// Логика для страницы добавления пользователя (index.html)
document.addEventListener("DOMContentLoaded", () => {
  const addUserBtn = document.getElementById("addUserBtn");
  const nickname = document.getElementById("nickname");
  const realname = document.getElementById("realname");
  const confirmBtn = document.getElementById("confirmBtn");
  const editBtn = document.getElementById("editBtn");

  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      const username = nickname.value.trim();
      const realName = realname.value.trim();

      if (username && realName) {
        // Показываем кнопки подтверждения
        showConfirmationButtons();

        // Устанавливаем обработчики для кнопок
        confirmBtn.onclick = () => {
          addUser(username, realName); // Добавляем пользователя
          nickname.value = ""; // Очищаем поля
          realname.value = "";
          document.getElementById("confirmationButtons").style.display = "none"; // Прячем кнопки
          alert("Пользователь добавлен!");
        };

        editBtn.onclick = () => {
          document.getElementById("confirmationButtons").style.display = "none"; // Прячем кнопки для редактирования
        };
      } else {
        alert("Пожалуйста, заполните оба поля!");
      }
    });
  }

  // Загружаем список пользователей (если применимо)
  loadUserList();
});

// Функция для загрузки списка пользователей
function loadUserList() {
  const userList = document.getElementById("userList");
  if (userList) {
    userList.innerHTML = "";
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach((user, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Ник: ${user.username}, Имя: ${user.realName}`;

      // Кнопка "Удалить"
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Удалить";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.addEventListener("click", () => {
        openDeleteModal(index);
      });

      listItem.appendChild(deleteBtn);
      userList.appendChild(listItem);
    });
  }
}

// Открываем модальное окно для удаления
function openDeleteModal(userIndex) {
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.style.display = "block";

  const deleteConfirmBtn = document.getElementById("deleteConfirmBtn");
  const deleteCancelBtn = document.getElementById("deleteCancelBtn");

  deleteConfirmBtn.onclick = () => {
    const deletePassword = document.getElementById("deletePassword").value;
    if (deletePassword === "12345") {
      deleteUser(userIndex);
      deleteModal.style.display = "none";
    } else {
      alert("Неверный пароль!");
    }
  };

  deleteCancelBtn.onclick = () => {
    deleteModal.style.display = "none";
  };
}

// Функция для удаления пользователя
function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadUserList();
}
