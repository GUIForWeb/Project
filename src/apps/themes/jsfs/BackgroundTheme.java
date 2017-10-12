package apps.themes.jsfs;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;
import apps.jsfs.ApplicationJSF;

@Named
@RequestScoped
public class BackgroundTheme extends ApplicationJSF{
	public BackgroundTheme() {
		super();
	}
	public void start() {
		this.redirect();
	}
}
