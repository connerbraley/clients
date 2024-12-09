use windows::{
    core::s,
    Win32::{
        Foundation::HWND,
        UI::{
            Input::KeyboardAndMouse::SetFocus,
            WindowsAndMessaging::{FindWindowA, SetForegroundWindow},
        },
    },
};

pub fn allow_foreground() {
    let _ = tokio::task::spawn_blocking(|| {
        loop {
            focus_security_prompt();
            std::thread::sleep(std::time::Duration::from_millis(500));
        }
    });

}

fn focus_security_prompt() -> bool {
    unsafe fn try_find_and_set_focus(
        class_name: windows::core::PCSTR,
    ) -> bool {
        let hwnd = unsafe { FindWindowA(class_name, None) };
        if let Ok(hwnd) = hwnd {
            set_focus(hwnd);
            return true;
        }
       false
    }

    let class_name = s!("Credential Dialog Xaml Host");
    unsafe { try_find_and_set_focus(class_name) }
}


fn set_focus(window: HWND) {
    unsafe {
        SetForegroundWindow(window);
        SetFocus(window);
    }
}