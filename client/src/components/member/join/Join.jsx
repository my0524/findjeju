import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ImageUpload from '../../imageUpload/ImageUpload';
import axios from 'axios';

export default function Join() {

    const [userData, setUserData] = useState([]);
    const [form, setForm] = useState({ name: '', id: '', pass: '', passcheck: '', nickname: '', email: '', echeck: '', eSelf: '', phone1: '', phone2: '', phone3: '' });
    const [image, setImage] = useState(null);
    const [emailToggle, setEmailToggle] = useState(false);

    let pattern_num = /[0-9]/;	// 숫자 
    let pattern_eng = /[a-zA-Z]/;	// 문자 
    let pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    let pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/
    // A-Z, a-z, 0-9 특수문자가 포함되어 있는지, 8자 이상
    const pattern_email = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    /* 
        @을 기준으로 앞 구간이 알파벳 or 숫자 조합으로 이루어져 있는지 체크
        @을 기준으로 뒷 구간이 알파벳 or 숫자 조합으로 이루어져 있는지 체크
        @을 기준으로 뒷 구간에서 . 뒷 구간이 알파벳 or 숫자 조합으로 이루어져 있는지 체크
    */
    const pattern_mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pattern_emoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/; // 이모지체크

    const [check, setCheck] = useState({ name: '', id: '', pass: '', passcheck: '', nickname: '', email: '', echeck: '', eSelf: '' });
    const [focus, setFocus] = useState({ name: '', id: '', pass: '', passcheck: '', nickname: '', email: '', echeck: '', eSelf: '' });
    const [validation, setValidation] = useState({ name: '필수 입력 항목입니다.', id: '필수 입력 항목입니다.', pass: '필수 입력 항목입니다.', passcheck: '필수 입력 항목입니다.', nickname: '필수 입력 항목입니다.', email: '필수 입력 항목입니다.', echeck: '필수 입력 항목입니다.', eSelf: '필수 입력 항목입니다.' });

    const fnSubmit = (e) => {



    }

    useEffect(() => {

        axios({

            method: 'get',
            url: 'http://127.0.0.1:8000/join'

        }).then((result) => {

            setUserData(result.data);
        })

    }, []);


    const fnChange = (e) => {

        const { name, value } = e.target

        /* 이름 유효성 검사 */
        if (name === 'name' && value) {
            const search = userData.some((val) => val.name === value);
            if (pattern_spc.test(value) || pattern_emoji.test(value) || pattern_eng.test(value)) {
                alert("특수문자,이모티콘,영어는 입력 할 수 없습니다.")
                return false
            } else if (value.length <= 2) {
                setValidation((validation) => ({ ...validation, name: '최소 두글자 이상입니다.' }));
            } else if (search) {
                setValidation((validation) => ({ ...validation, name: '동일한 이름이 존재합니다.' }));
            } else if (value.length >= 6) {
                setValidation((validation) => ({ ...validation, name: '최대 다섯글자 입니다.' }));
                return false
            } else {
                setValidation((validation) => ({ ...validation, name: '사용 가능한 이름입니다.' }));
            }
            setCheck((check) => ({ ...check, name: 'name' }));
        } else if (name === 'name' && !value) {
            setCheck((check) => ({ ...check, name: '' }));
            setValidation((validation) => ({ ...validation, name: '필수 입력 항목입니다.' }));
        }

        /* 아이디 유효성 검사 */
        if (name === 'id' && value) {
            setCheck((check) => ({ ...check, id: 'id' }));
            const search = userData.some((val) => val.id === value);
            if (pattern_kor.test(value) || pattern_spc.test(value) || pattern_emoji.test(value)) {
                alert("특수문자,이모티콘, 한글은 입력 할 수 없습니다.")
                return false
            } else if (value.length <= 4 || value.length >= 12) {
                setValidation((validation) => ({ ...validation, id: '최소 5자 이상, 최대 12글자 입니다.' }));
            } else if (search) {
                setValidation((validation) => ({ ...validation, id: '동일한 아이디가 존재합니다.' }));
            } else {
                setValidation((validation) => ({ ...validation, id: '사용 가능한 아이디입니다.' }));
            }
        } else if (name === 'id' && !value) {
            setCheck((check) => ({ ...check, id: '' }));
            setValidation((validation) => ({ ...validation, id: '필수 입력 항목입니다.' }));
        }
        /* 패스워드 유효성 검사 */
        if (name === 'pass' && value) {
            setCheck((check) => ({ ...check, pass: 'pass' }));
            if (!reg.test(value)) {
                setValidation((validation) => ({ ...validation, pass: '한글을 제외한 특수문자,문자,숫자를 포함하여 8자 이상 입력해주세요.' }))
            } else if (value.length >= 13) {
                setValidation((validation) => ({ ...validation, pass: '최대 12글자 입니다.' }))
            } else {
                setValidation((validation) => ({ ...validation, pass: '사용 가능한 비밀번호입니다.' }))
            }
        } else if (name === 'pass' && !value) {

            setCheck((check) => ({ ...check, pass: '' }));
            setValidation((validation) => ({ ...validation, pass: '필수 입력 항목입니다.' }));

        }

        /* 패스워드 체크 유효성 검사 */
        if (name === 'passcheck' && value) {
            setCheck((check) => ({ ...check, passcheck: 'passcheck' }));
            if (form.pass === value) {
                setValidation((validation) => ({ ...validation, passcheck: '입력하신 비밀번호와 같습니다.' }))
            } else {
                setValidation((validation) => ({ ...validation, passcheck: '입력하신 비밀번호와 다릅니다.' }))
            }
        } else if (name === 'passcheck' && !value) {

            setCheck((check) => ({ ...check, passcheck: '' }));
            setValidation((validation) => ({ ...validation, passcheck: '필수 입력 항목입니다.' }));

        }
        /* 닉네임 유효성 검사 */
        if (name === 'nickname' && value) {
            const search = userData.some((val) => val.nickname === value);
            setCheck((check) => ({ ...check, nickname: 'nickname' }));
            if (pattern_spc.test(value) || pattern_emoji.test(value)) {
                alert("특수문자,이모티콘은 입력 할 수 없습니다.")
                return false
            }
            if (value.length <= 2) {
                setValidation((validation) => ({ ...validation, nickname: '최소 두글자 이상입니다.' }));
            } else if (search) {
                setValidation((validation) => ({ ...validation, nickname: '동일한 닉네임이 존재합니다.' }));
            } else if (value.length >= 8) {
                setValidation((validation) => ({ ...validation, nickname: '최대 8글자 입니다.' }));
                return false
            } else {
                setValidation((validation) => ({ ...validation, nickname: '사용 가능한 닉네임입니다.' }));
            }
        } else if (name === 'nickname' && !value) {
            setCheck((check) => ({ ...check, nickname: '' }));
            setValidation((validation) => ({ ...validation, nickname: '필수 입력 항목입니다.' }));
        }

        /* 이메일 유효성 검사 */

        if (name === 'email' && value) {
            const emailCheck = form.email + '@' + form.echeck
            const emailSelfCheck = form.email + '@' + form.eSelf
            const search = userData.some((val) => val.email === emailCheck);
            const selfSearch = userData.some((val) => val.email === emailSelfCheck);
            if (search || selfSearch) {
                setValidation((validation) => ({ ...validation, email: '등록된 이메일입니다.' }));
            } else if (pattern_mail.test(emailCheck) || pattern_mail.test(emailSelfCheck)) {
                setValidation((validation) => ({ ...validation, email: '이메일을 인증해주세요.' }));
            } else {
                setCheck((check) => ({ ...check, email: 'email' }));
                setValidation((validation) => ({ ...validation, email: '이메일 형식에 맞지 않습니다.' }));
            }

        } else if (name === 'email' && !value) {
            setCheck((check) => ({ ...check, email: '' }));
            setValidation((validation) => ({ ...validation, email: '필수 입력 항목입니다.' }));
        }

        if (name === 'echeck') {
            const emailCheck = form.email + '@' + form.echeck
            const emailSelfCheck = form.email + '@' + form.eSelf
            const search = userData.some((val) => val.email === emailCheck);
            const selfSearch = userData.some((val) => val.email === emailSelfCheck);
            if (search || selfSearch) {
                setValidation((validation) => ({ ...validation, email: '등록된 이메일입니다.' }));
            } else if (pattern_mail.test(emailCheck) || pattern_mail.test(emailSelfCheck)) {
                setValidation((validation) => ({ ...validation, email: '이메일을 인증해주세요.' }));
            } else {
                setCheck((check) => ({ ...check, email: 'email' }));
                setValidation((validation) => ({ ...validation, email: '이메일 형식에 맞지 않습니다.' }));
            }

        } else if (name === 'email' && !value) {
            setCheck((check) => ({ ...check, email: '' }));
            setValidation((validation) => ({ ...validation, email: '필수 입력 항목입니다.' }));
        }

        /* 핸드폰번호 유효성 검사 */

        if (name === 'phone' && value) {

        }

        /* 이용약관 유효성 검사*/

        if (name === 'terms' && value) {

        }

        setForm({ ...form, [name]: value });

    }

    useEffect(() => {
        const emailCheck = form.email + '@' + form.echeck
        const emailSelfCheck = form.email + '@' + form.eSelf
        const search = userData.some((val) => val.email === emailCheck);
        const selfSearch = userData.some((val) => val.email === emailSelfCheck);
        console.log(emailSelfCheck);
        console.log(selfSearch);
        if (search || selfSearch) {
            setValidation((validation) => ({ ...validation, email: '등록된 이메일입니다.' }));
        } else if (pattern_mail.test(emailCheck) || pattern_mail.test(emailSelfCheck)) {
            setValidation((validation) => ({ ...validation, email: '이메일을 인증해주세요.' }));
        }

    }, [form.echeck, form.email, form.eSelf])

    const getImage = (e, d) => {
        setImage(e);
    }

    const handleFocus = (e) => {

        const { name, value } = e.target;

        if (value) {

            return false

        }

        setFocus((focus) => ({ ...focus, [name]: 'ok' }));

    }

    return (
        <>
            <div className={`${styles.wrap} inner`}>
                <div className={styles.joinBox}>
                    <h2 className={styles.title}>회원가입</h2>
                    <form className={styles.joinForm} onSubmit={fnSubmit}>
                        <ul className={styles.joinList}>
                            <li className={styles.joinLi}>
                                <label id="name">* 이름</label>
                                <input type="text" name="name" id="name" value={form.name} onChange={fnChange} placeholder='이름' onFocus={handleFocus} />
                                {focus.name === '' || check.name === 'name'
                                    ? validation.name === '최소 두글자 이상입니다.' || validation.name === '최대 다섯글자 입니다.' || validation.name === '동일한 이름이 존재합니다.'
                                        ? <span>{validation.name}</span>
                                        : validation.name === '필수 입력 항목입니다.' ? null : <span className={styles.success}>{validation.name}</span>
                                    : <span>{validation.name}</span>}
                            </li>
                            <li className={styles.joinLi}>
                                <label id="id">* 아이디</label>
                                <input type="text" name="id" id="id" value={form.id} onChange={fnChange} placeholder='아이디' onFocus={handleFocus} />
                                {focus.id === '' || check.id === 'id'
                                    ? validation.id === '최소 5자 이상, 최대 12글자 입니다.' || validation.id === '동일한 아이디가 존재합니다.'
                                        ? <span>{validation.id}</span>
                                        : validation.id === '필수 입력 항목입니다.' ? null : <span className={styles.success}>{validation.id}</span>
                                    : <span>{validation.id}</span>}
                            </li>
                            <li className={styles.joinLi}>
                                <label id="pass">* 비밀번호</label>
                                <input type="password" name="pass" id="pass" value={form.pass} onChange={fnChange} placeholder='비밀번호' onFocus={handleFocus} />
                                {focus.pass === '' || check.pass === 'pass'
                                    ? validation.pass === '한글을 제외한 특수문자,문자,숫자를 포함하여 8자 이상 입력해주세요.'
                                        ? <span>{validation.pass}</span>
                                        : validation.pass === '필수 입력 항목입니다.' ? null : <span className={styles.success}>{validation.pass}</span>
                                    : <span>{validation.pass}</span>}
                            </li>
                            <li className={styles.joinLi}>
                                <label id="passcheck">* 비밀번호 체크</label>
                                <input type="password" name="passcheck" id="passcheck" value={form.passcheck} onChange={fnChange} placeholder='비밀번호 확인' onFocus={handleFocus} />
                                {focus.passcheck === '' || check.passcheck === 'passcheck'
                                    ? validation.passcheck === '입력하신 비밀번호와 다릅니다.'
                                        ? <span>{validation.passcheck}</span>
                                        : validation.passcheck === '필수 입력 항목입니다.' ? null : <span className={styles.success}>{validation.passcheck}</span>
                                    : <span>{validation.passcheck}</span>
                                }
                            </li>
                            <li className={styles.joinLi}>
                                <label id="nickname">* 닉네임</label>
                                <input type="text" name="nickname" id="nickname" value={form.nickname} onChange={fnChange} placeholder='닉네임' onFocus={handleFocus} />
                                {focus.nickname === '' || check.nickname === 'nickname'
                                    ? validation.nickname === '최소 두글자 이상입니다.' || validation.nickname === '최대 8글자 입니다.' || validation.nickname === '동일한 닉네임이 존재합니다.'
                                        ? <span>{validation.nickname}</span>
                                        : validation.nickname === '필수 입력 항목입니다.' ? null : <span className={styles.success}>{validation.nickname}</span>
                                    : <span>{validation.nickname}</span>
                                }
                            </li>
                            <li className={styles.joinLi}>
                                <label id="email">* 이메일</label>
                                <div className={styles.emailWrap}>
                                    <input type="text" name="email" id="email" className={styles.emailInput} value={form.email} onChange={fnChange} placeholder='이메일' onFocus={handleFocus} />
                                    <span>@</span>
                                    {form.echeck === 'manual'
                                        ?
                                        <div>
                                            <input type='text' name='eSelf' value={form.eSelf} onChange={fnChange} onFocus={handleFocus} />
                                            <span className={styles.emailClose} onClick={() => {
                                                setForm((form) => ({ ...form, email: '' }));
                                            }}>x</span>
                                        </div>
                                        :
                                        <select name="echeck" id="echeck" value={form.echeck}  // select의 value를 state와 연동
                                            onChange={fnChange} onFocus={handleFocus}>
                                            <option value="" disabled>선택해주세요.</option>
                                            <option value="naver.com">naver.com</option>
                                            <option value="hanmail.net">hanmail.com</option>
                                            <option value="daum.net">daum.com</option>
                                            <option value="gmail.com">gmail.com</option>
                                            <option value="nate.com">nate.com</option>
                                            <option value="hotmail.com">hotmail.com</option>
                                            <option value="outlook.com">outlook.com</option>
                                            <option value="icloud.com">icloud.com</option>
                                            <option value="manual">직접입력</option>
                                        </select>}
                                </div>
                                {focus.email === '' || check.email === 'email' || check.echeck === 'echeck'
                                    ? validation.email === '이메일 형식에 맞지 않습니다.' || validation.email === '등록된 이메일입니다.'
                                        ? <span>{validation.email}</span>
                                        : validation.email === '필수 입력 항목입니다.' ? null : <span className={styles.success}>{validation.email}</span>
                                    : <span>{validation.email}</span>
                                }
                                <button type='button' className={styles.emailBtn} disabled={validation.email === '이메일 형식에 맞지 않습니다.' || validation.email === '등록된 이메일입니다.'} onClick={() => {
                                    setEmailToggle(!emailToggle)
                                }}>
                                    이메일 인증하기
                                </button>
                                {emailToggle ?
                                    <div className={styles.emailCodeBox}>
                                        <p className={styles.desCode}>이메일로 전송된 인증코드를 입력해주세요.</p>
                                        <div>
                                            <input type="text" placeholder='인증코드 6자리 입력' />
                                            <button>확인</button>
                                        </div>
                                        <p>이메일을 받지 못하셨나요? <span>이메일 재전송하기</span></p>
                                    </div> : null}
                            </li>
                            <li className={styles.joinLi}>
                                <label id="phone">* 핸드폰번호</label>
                                <div className={styles.phoneWrap}>
                                    <input type="text" name="phone1" id="phone" value={form.phone1} onChange={fnChange} placeholder='010' />
                                    <span>-</span>
                                    <input type="text" name="phone2" id="phone" value={form.phone2} onChange={fnChange} placeholder='1234' />
                                    <span>-</span>
                                    <input type="text" name="phone3" id="phone" value={form.phone3} onChange={fnChange} placeholder='5678' />
                                </div>
                            </li>
                            <li className={styles.joinLi}>
                                <label id="postal">* 우편번호</label>
                                <div className={styles.postalWrap}>
                                    <input type="text" name="postal" id="postal" value={form.postal} onChange={fnChange} placeholder='우편번호 입력' />
                                    <button className={styles.postalBtn}>우편번호 검색</button>
                                </div>
                            </li>
                            <li className={styles.joinLi}>
                                <label id="address">* 주소</label>
                                <div className={styles.addressWrap}>
                                    <input type="text" name="address" id="address" value={form.address} onChange={fnChange} />
                                    <input type="text" name="address" id="address" value={form.address} onChange={fnChange} />
                                </div>
                            </li>
                            <li className={styles.joinLi}>
                                <label id="upload">* 사진 업로드</label>
                                <input type="hidden" name="upload" placeholder="image" value={image} />
                                <ImageUpload getImage={getImage} />
                            </li>
                            <li className={styles.joinLi}>
                                <label id="terms">* 약관동의</label>
                                <div className={styles.terms}>
                                    <p><input type="checkbox" name="terms" /><span>개인정보 수집이용 동의 (필수)</span></p>
                                    <p><input type="checkbox" name="terms" /><span>전자금융거래 이용약관 동의 (필수)</span></p>
                                    <p><input type="checkbox" name="terms" /><span>마케팅 정보 메일, SMS 수신동의 (선택)</span></p>
                                </div>
                            </li>
                        </ul>
                        <button type='submit' className={styles.joinBtn}>회원가입</button>
                    </form>
                </div>
            </div >
        </>
    );
}
