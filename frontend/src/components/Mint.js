import React from "react";

export function Mint({ mintToken }) {
  return (
    <div>
      <h4>Mint</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const to = formData.get("to");
          const uri = formData.get("uri");

          if (to && uri) {
            mintToken(to, uri);
          }
        }}
      >
        <div className="form-group">
          <label>URI</label>
          <input
            className="form-control"
            type="text"
            step="1"
            name="uri"
            placeholder="URI"
            required
          />
        </div>
        <div className="form-group">
          <label>Recipient address</label>
          <input className="form-control" type="text" placeholder="0x" name="to" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Transfer" />
        </div>
      </form>
    </div>
  );
}
