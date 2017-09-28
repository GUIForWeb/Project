var models = system.models
var Background = system.models.Background;
var Bar = system.models.Bar;
var BackgroundContextMenu = system.models.BackgroundContextMenu;
var Icon = system.models.Icon;
var DataIcon = system.models.DataIcon;
var Model = system.models.Model;
var Taskbar = system.models.Taskbar;
var WinAndBarNode = system.models.WinAndBarNode;
var Window = system.models.Window;
var IconContextMenu = system.models.IconContextMenu;

var view = system.views;
var BackgroundView = system.views.BackgroundView;
var BarView = system.views.BarView;
var BackgroundContextMenuView = system.views.BackgroundContextMenuView;
var IconView = system.views.IconView;
var TaskbarView = system.views.TaskbarView;
var WindowView = system.views.WindowView;
var IconContextMenuView = system.views.IconContextMenuView;
var DataIconView = system.views.DataIconView;

var DesktopWebSocket = system.webSockets.DesktopWebSocket;

//Window
var WinAndBar = system.modules.WinAndBar;

var BarManager = system.winsAndBars.subsystems.BarManager;
var EnumEngine = system.winsAndBars.subsystems.EnumEngine;
var GUIXMLHttpRequest = system.winsAndBars.subsystems.GUIXMLHttpRequest;
var GUIManager = system.winsAndBars.subsystems.GUIManager;
var GUIRepository = system.winsAndBars.subsystems.GUIRepository;
var NodeManager = system.winsAndBars.subsystems.NodeManager;
var PositioningEngine = system.winsAndBars.subsystems.PositioningEngine;
var WindowManager = system.winsAndBars.subsystems.WindowManager;
var WindowSizingEngine = system.winsAndBars.subsystems.WindowSizingEngine;
var AppManager = system.winsAndBars.subsystems.AppManager;

var controllers = system.winsAndBars.controllers
var Change = system.winsAndBars.controllers.Change;
var Click = system.winsAndBars.controllers.Click;
var Controller = system.winsAndBars.controllers.Controller;
var Dblclick = system.winsAndBars.controllers.Dblclick;
var Drag = system.winsAndBars.controllers.Drag;
var Mouseout = system.winsAndBars.controllers.Mouseout;
var Mouseover = system.winsAndBars.controllers.Mouseover;
var Resize = system.winsAndBars.controllers.Resize;

var drags = system.winsAndBars.controllers.drags
var Dragend = system.winsAndBars.controllers.drags.Dragend;
var Draging = system.winsAndBars.controllers.drags.Draging;
var Dragstart = system.winsAndBars.controllers.drags.Dragstart;
var Dragover = system.winsAndBars.controllers.drags.Dragover;
var Drop = system.winsAndBars.controllers.drags.Drop;

var Mouse = system.winsAndBars.controllers.Mouse;
var mouses = system.winsAndBars.controllers.mouses;
var Mouseout = system.winsAndBars.controllers.mouses.Mouseout;
var Mouseover = system.winsAndBars.controllers.mouses.Mouseover;

var resizes = system.winsAndBars.controllers.resizes
var Resizeend = system.winsAndBars.controllers.resizes.Resizeend;
var Resizestart = system.winsAndBars.controllers.resizes.Resizestart;
var Resizing = system.winsAndBars.controllers.resizes.Resizing;

//Desktop
var Desktop = system.modules.Desktop;

var DesktopManager = system.desktops.subsystems.DesktopManager;
var DesktopSender = system.desktops.subsystems.DesktopSender;
var DesktopFunction = system.desktops.subsystems.DesktopFunction;
var DesktopController = system.desktops.subsystems.DesktopController;
var DesktopMouse = system.desktops.controllers.DesktopMouse;
var DesktopMouseout = system.desktops.controllers.mouses.DesktopMouseout;
var DesktopMouseover = system.desktops.controllers.mouses.DesktopMouseover;
