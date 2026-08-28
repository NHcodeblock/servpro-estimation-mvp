<form name="estimate-submission" method="POST" netlify>
  <input type="hidden" name="form-name" value="estimate-submission" />
  
  <div className="form-card">
    <label htmlFor="name">Full Name</label>
    <input
      id="name"
      type="text"
      name="name"
      placeholder="e.g. John Doe"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div className="form-card">
    <label htmlFor="email">Email Address</label>
    <input
      id="email"
      type="email"
      name="email"
      placeholder="e.g. john@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className="form-card">
    <label htmlFor="phone">Phone Number</label>
    <input
      id="phone"
      type="tel"
      name="phone"
      placeholder="e.g. (708) 240-4873"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
  </div>

  <input type="hidden" name="estimate" value={JSON.stringify(data)} />

  <button type="submit" className="btn-primary">
    📧 Send Estimate
  </button>
</form>