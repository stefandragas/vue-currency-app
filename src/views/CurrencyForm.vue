<template>
  <div class="home col-sm-5 col-sm-offset-4">
    <form
      @submit.prevent="submitForm()"
      class="main-form"
      :class="{'was-validated' : !errors && iso && symbol }"
    >
      <fieldset>
        <legend class="main-form__title" v-if="!id">Add Currency</legend>
        <legend class="main-form__title" v-else>Edit Currency</legend>

        <div class="row main-form__input-container">
          <div class="col-sm-6">
            <label class="control-label main-form__label">Currency Code</label>
          </div>
          <div class="col-sm-6 px-0">
            <input
              type="text"
              maxlength="3"
              class="form-control main-form__input"
              v-model="iso"
              name="iso"
              @keyup="event => checkValidate(event)"
              :class="{'is-invalid text-danger' : errors && errors.iso}"
              ref="iso"
            >
            <div class="invalid-feedback pl-2" v-if="errors && errors.iso">{{errors.iso}}</div>
          </div>
        </div>
        <div class="row main-form__input-container">
          <div class="col-sm-6">
            <label class="control-label main-form__label">Currency Symbol</label>
          </div>
          <div class="col-sm-6 px-0">
            <input
              type="text"
              maxlength="4"
              class="form-control main-form__input"
              v-model="symbol"
              name="symbol"
              @keyup="event => checkValidate(event)"
              :class="{'is-invalid text-danger' : errors && errors.symbol}"
            >
            <div class="invalid-feedback pl-2" v-if="errors && errors.symbol">{{errors.symbol}}</div>
          </div>
        </div>
        <div class="form-group main-form__button-container">
          <button type="submit" class="btn main-form__button">Submit</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { v4 } from "uuid";

export default {
  name: "Form",
  components: {},
  props: {
    currency: null,
    id: null
  },
  data() {
    return {
      iso: "",
      symbol: "",
      errors: null
    };
  },
  watch: {
    currency: {
      handler(newValue) {
        if (newValue) {
          this.iso = newValue.iso;
          this.symbol = newValue.symbol;
        } else {
          this.resetForm();
        }
      }
    }
  },
  methods: {
    ...mapActions(["addNewCurrency", "editCurrency"]),
    submitForm() {
      this.errors = {};

      if (this.checkIfCurrencyAlreadyExists(this.iso)) {
        this.errors.iso = "Code already exists";
      }

      if (!this.iso) {
        this.errors.iso = "Code is required";
      }

      if (this.iso.length === 1 || this.iso.length === 2) {
        this.errors.iso = "Code must be three characters";
      }

      if (!this.symbol) {
        this.errors.symbol = "Symbol is required";
      }

      if (this.errors.iso || this.errors.symbol) {
        return;
      }

      this.errors = null;

      if (!this.id) {
        this.addNewCurrency({
          id: v4(),
          iso: this.iso,
          symbol: this.symbol
        });
        this.resetForm();
      } else {
        this.editCurrency({
          id: this.id,
          iso: this.iso,
          symbol: this.symbol
        });
      }
      this.$refs.iso.focus();
    },
    resetForm() {
      this.iso = "";
      this.symbol = "";
    },
    checkIfCurrencyAlreadyExists(iso) {
      return this.getCurrencies.some(el => el.iso === iso);
    },
    checkValidate(event) {
      if (event.target.name === "iso") {
        this.iso = event.target.value.toUpperCase();
      }

      if (this.errors) {
        this.errors = null;
      }
    }
  },
  mounted() {
    if (this.$route.params) {
      const currency = this.getCurrencyById(this.$route.params.id);
      if (currency) {
        this.symbol = currency.symbol;
        this.iso = currency.iso;
      }
    }
    this.$refs.iso.focus();
  },
  computed: {
    ...mapGetters(["getCurrencyById", "getCurrencies"])
  }
};
</script>

<style lang="scss">
.main-form {
  padding: 0 1rem;

  &__title {
    color: #fe660f;
    border-bottom: 1px solid #fe660f;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    font-size: 1rem;
  }

  &__input-container {
    border-bottom: 1px solid #999;
    padding: 0.5rem 0;
    margin-bottom: 0;

    &:first-of-type {
      padding-top: 0;
    }
  }

  &__label {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 0.85rem;
  }

  &__input {
    border-color: #999;
    background-image: none !important;

    &:focus {
      outline: none !important;
      border-color: #999;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
    }

    &--error {
      border-color: red;
    }
  }

  &__button-container {
    text-align: right;
    margin-right: -1rem;
  }

  &__button {
    width: 10rem;
    text-align: center;
    text-transform: uppercase;
    background-color: #fe660f;
    color: white;
    margin-top: 1rem;
    margin-right: 0;

    &:active,
    &:focus {
      outline: 0 !important;
      box-shadow: none !important;
    }

    &:hover {
      color: white;
    }
  }
}
</style>
