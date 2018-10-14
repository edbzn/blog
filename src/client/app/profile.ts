import { html } from "lit-html";

export const profile = ({
  name,
  description,
  avatarUrl,
}: {
  name: string;
  description: string;
  avatarUrl: string;
}) => html`
<style scoped>
  .profile {
    display: flex;
    align-items: center;
  }

  .avatar {
    min-width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 100%;
  }

  .avatar img {
    width: 150px;
    height: 150px;
  }

  .presentation {
    padding-left: 1.4rem;
  }
</style>
<section class="profile">
  <div class="avatar">
    <img src="${avatarUrl}">
  </div>
  <div class="presentation">
    <h1>${name}</h1>
    <p>${description}</p>
  </div>
</section>
`;
