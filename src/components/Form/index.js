import React from "react";

function Form({ title, onSubmit, submitText, children }) {
  return (
    <section className="row">
      <div className="col s12 m8 offset-m2">
        <div className="card grey darken-2">
          <div className="card-content">
            <span className="card-title">{title}</span>

            <form className="row" onSubmit={onSubmit}>
              {children}
              <div className="input-field col s12">
                <button type="submit" className="btn blue">
                  {submitText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Form;
