<template functional>
  <footer class="footer">
    <router-link :to="{ name: 'Terms' }">{{
      parent.$t("footer.privacy")
    }}</router-link>
    <cookie-law theme="dark-lime" buttonText="OK">
      <div slot="message">
        {{ parent.$t("footer.cookies.message")
        }}<router-link
          target="_blank"
          class="more-info"
          :to="{ name: 'Terms' }"
          >{{ parent.$t("footer.cookies.infoButton") }}</router-link
        >
      </div>
    </cookie-law>
  </footer>
</template>

<style>
.footer {
  background-color: #404040;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.footer a {
  font-size: 14px;
  color: #d4d4d4 !important;
  margin-right: 16px;
}
.footer a:hover,
.footer a:visited,
.footer a:link,
.footer a:active {
  color: #d4d4d4 !important;
}
.footer .more-info {
  font-size: inherit;
  text-decoration: underline;
}
</style>
