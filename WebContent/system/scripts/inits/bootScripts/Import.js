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

//Window
var WinAndBar = system.modules.WinAndBar;

var WinAndBarXMLHttpRequest = system.elements.winAndBars.subsystems.WinAndBarXMLHttpRequest;
var WinAndBarRepository = system.elements.winAndBars.subsystems.WinAndBarRepository;
var WinAndBarManager = system.elements.winAndBars.subsystems.WinAndBarManager;
var BarManager = system.elements.winAndBars.subsystems.managers.BarManager;
var WindowManager = system.elements.winAndBars.subsystems.managers.WindowManager;
var NodeManager = system.elements.winAndBars.subsystems.managers.NodeManager;
var EnumEngine = system.elements.winAndBars.subsystems.engines.EnumEngine;
var PositioningEngine = system.elements.winAndBars.subsystems.engines.PositioningEngine;
var WindowSizingEngine = system.elements.winAndBars.subsystems.engines.WindowSizingEngine;

var WinAndBarChange = system.elements.winAndBars.controllers.WinAndBarChange;
var WinAndBarClick = system.elements.winAndBars.controllers.WinAndBarClick;
var WinAndBarController = system.elements.winAndBars.controllers.WinAndBarController;
var WinAndBarDblclick = system.elements.winAndBars.controllers.WinAndBarDblclick;

var WinAndBarMouseout = system.elements.winAndBars.controllers.WinAndBarMouseout;
var WinAndBarMouseover = system.elements.winAndBars.controllers.WinAndBarMouseover;
var WinAndBarResize = system.elements.winAndBars.controllers.WinAndBarResize;
var WinAndBarContextMenu = system.elements.winAndBars.controllers.WinAndBarContextMenu;

var WinAndBarDrag = system.elements.winAndBars.controllers.WinAndBarDrag;
var WinAndBarDragend = system.elements.winAndBars.controllers.drags.WinAndBarDragend;
var WinAndBarDraging = system.elements.winAndBars.controllers.drags.WinAndBarDraging;
var WinAndBarDragstart = system.elements.winAndBars.controllers.drags.WinAndBarDragstart;
var WinAndBarDragover = system.elements.winAndBars.controllers.drags.WinAndBarDragover;
var WinAndBarDrop = system.elements.winAndBars.controllers.drags.WinAndBarDrop;

var WinAndBarMouse = system.elements.winAndBars.controllers.WinAndBarMouse;
var WinAndBarMouseout = system.elements.winAndBars.controllers.mouses.WinAndBarMouseout;
var WinAndBarMouseover = system.elements.winAndBars.controllers.mouses.WinAndBarMouseover;

var WinAndBarResizeend = system.elements.winAndBars.controllers.resizes.WinAndBarResizeend;
var WinAndBarResizestart = system.elements.winAndBars.controllers.resizes.WinAndBarResizestart;
var WinAndBarResizing = system.elements.winAndBars.controllers.resizes.WinAndBarResizing;

//Configure
var Configure = system.modules.Configure;
var ConfigureManager = system.elements.configures.subsystems.ConfigureManager;
var ExecutionManager = system.elements.configures.subsystems.managers.ExecutionManager;

//Desktop
var Desktop = system.modules.Desktop;
var DesktopManager = system.elements.desktops.subsystems.DesktopManager;
var DesktopSender = system.elements.desktops.subsystems.DesktopSender;
var DesktopSelect = system.elements.desktops.subsystems.DesktopSelect;

var DesktopClickSelect = system.elements.desktops.subsystems.selects.DesktopClickSelect;
var DesktopContextMenuSelect = system.elements.desktops.subsystems.selects.DesktopContextMenuSelect;
var DesktopCtrlSelect = system.elements.desktops.subsystems.selects.DesktopCtrlSelect;
var DesktopMousemoveSelect = system.elements.desktops.subsystems.selects.DesktopMousemoveSelect;
var DesktopSelectCancle = system.elements.desktops.subsystems.selects.DesktopSelectCancle;
var DesktopSelectEnd = system.elements.desktops.subsystems.selects.DesktopSelectEnd;
var DesktopShiftSelect = system.elements.desktops.subsystems.selects.DesktopShiftSelect;

var DesktopController = system.elements.desktops.controllers.DesktopController;
var DesktopContextMenu = system.elements.desktops.controllers.DesktopContextMenu;
var DesktopDblclick = system.elements.desktops.controllers.DesktopDblclick;
var DesktopClick = system.elements.desktops.controllers.DesktopClick;

var DesktopMouse = system.elements.desktops.controllers.DesktopMouse;
var DesktopMouseout = system.elements.desktops.controllers.mouses.DesktopMouseout;
var DesktopMouseover = system.elements.desktops.controllers.mouses.DesktopMouseover;
var DesktopMousedown = system.elements.desktops.controllers.mouses.DesktopMousedown;
var DesktopMousemove = system.elements.desktops.controllers.mouses.DesktopMousemove;
var DesktopMouseup = system.elements.desktops.controllers.mouses.DesktopMouseup;

var DesktopDrag = system.elements.desktops.controllers.DesktopDrag;
var DesktopDragend = system.elements.desktops.controllers.drags.DesktopDragend;
var DesktopDraging = system.elements.desktops.controllers.drags.DesktopDraging;
var DesktopDragstart = system.elements.desktops.controllers.drags.DesktopDragstart;
var DesktopDragover = system.elements.desktops.controllers.drags.DesktopDragover;
var DesktopDrop = system.elements.desktops.controllers.drags.DesktopDrop;

var DesktopFocus = system.elements.desktops.controllers.DesktopFocus;
var DesktopFocusout = system.elements.desktops.controllers.focuses.DesktopFocusout;
var DesktopFocusin = system.elements.desktops.controllers.focuses.DesktopFocusin;

var DesktopKey = system.elements.desktops.controllers.DesktopKey;
var DesktopKeydown = system.elements.desktops.controllers.keys.DesktopKeydown;
var DesktopKeyup = system.elements.desktops.controllers.keys.DesktopKeyup;
var DesktopKeypress = system.elements.desktops.controllers.keys.DesktopKeypress;

var DesktopWebSocket = system.elements.desktops.communications.DesktopWebSocket;
var DesktopSender = system.elements.desktops.communications.webSockets.DesktopSender;
var DesktopReceiver = system.elements.desktops.communications.webSockets.DesktopReceiver;


