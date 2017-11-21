
package system.models;

public class User {
	private int id;
	private String nickname;
	private String email;
	private String role;
	private String password;
	private String confirm;
	private boolean activation;
	
	public User() {
		this.activation = false;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirm() {
		return confirm;
	}

	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isActivation() {
		return activation;
	}

	public void setActivation(boolean activation) {
		this.activation = activation;
	}
	
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
	public String toString() {
		String str = "";
		str += "ID        : " + this.id + System.getProperty("line.separator");
		str += "Nick Name : " + this.nickname + System.getProperty("line.separator");
		str += "E-mail    : " + this.email + System.getProperty("line.separator");
		str += "Role      : " + this.role + System.getProperty("line.separator");
		str += "Password  : " + this.password + System.getProperty("line.separator");
		str += "Confirm   : " + this.confirm + System.getProperty("line.separator");
		str += "Activation: " + this.activation;
		return str;
	}
}
