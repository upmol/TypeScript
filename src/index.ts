import { renderSearchFormBlock } from "../src/search-form";
import { renderSearchStubBlock } from "../src/search-results";
import { renderUserBlock } from "../src/user";
import { renderToast } from "../src/lib";

window.addEventListener("DOMContentLoaded", () => {
  renderUserBlock("Den Warren", "/img/avatar.png", 0);
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
});