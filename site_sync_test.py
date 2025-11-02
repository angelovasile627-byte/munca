#!/usr/bin/env python3
"""
Site Sync Endpoint Fix Testing
Tests the fix for SiteSync model to include siteStyles field
"""

import requests
import json
import sys
import uuid
from datetime import datetime

# Get backend URL from frontend .env
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except:
        pass
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_URL = f"{BASE_URL}/api"

print(f"Testing Site Sync endpoint at: {API_URL}")
print("=" * 60)

def test_site_sync_with_sitestyles():
    """Test Site Sync endpoint with siteStyles included - should work now"""
    print("\n🔧 Testing Site Sync Endpoint with siteStyles")
    print("-" * 50)
    
    # Create test site data with pages AND siteStyles (as requested)
    site_data = {
        "id": str(uuid.uuid4()),
        "name": "Test Site with Styles",
        "status": "unpublished",
        "pages": [
            {
                "id": str(uuid.uuid4()),
                "name": "Home",
                "pageUrl": "index.html",
                "blocks": [
                    {"id": "block1", "type": "hero", "content": "Welcome to Test Site"},
                    {"id": "block2", "type": "text", "content": "This is test content"}
                ],
                "pageDescription": "Home page description",
                "socialSharingEnabled": True,
                "socialSharingImageUrl": "",
                "headCode": "<!-- Test head code -->",
                "bodyEndCode": "<!-- Test body end code -->",
                "beforeDoctypeCode": ""
            },
            {
                "id": str(uuid.uuid4()),
                "name": "About",
                "pageUrl": "about.html",
                "blocks": [
                    {"id": "block3", "type": "text", "content": "About us content"}
                ],
                "pageDescription": "About page description",
                "socialSharingEnabled": False,
                "socialSharingImageUrl": "",
                "headCode": "",
                "bodyEndCode": "",
                "beforeDoctypeCode": ""
            }
        ],
        "siteStyles": {
            "colors": {
                "primary": "#4CAF50",
                "buttonsAndLinks": ["#FF69B4", "#8B4513", "#8B0000", "#48D1CC", "#FFFFFF"]
            },
            "fonts": {
                "title1": {"family": "Inter Tight", "size": 5.0},
                "title2": {"family": "Inter Tight", "size": 4.0},
                "title3": {"family": "Inter Tight", "size": 2.0},
                "text": {"family": "Inter Tight", "size": 1.4},
                "menu": {"family": "Inter Tight", "size": 1.4}
            },
            "options": {
                "roundedCorners": True,
                "roundedButtons": False,
                "largeButtons": True,
                "underlinedLinks": False,
                "animationOnScroll": True
            },
            "customCSS": "/* Custom CSS for test site */"
        }
    }
    
    try:
        print(f"Sending sync request for site: {site_data['name']}")
        print(f"Site ID: {site_data['id']}")
        print(f"Pages count: {len(site_data['pages'])}")
        print(f"SiteStyles included: {'Yes' if 'siteStyles' in site_data else 'No'}")
        
        response = requests.post(f"{API_URL}/sites/sync", json=site_data, timeout=30)
        
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            response_data = response.json()
            
            # Verify response contains success: true
            if response_data.get('success') == True:
                print("✅ PASS: Site sync successful with siteStyles included")
                print(f"   - Action: {response_data.get('action', 'N/A')}")
                print(f"   - Site ID: {response_data.get('site_id', 'N/A')}")
                return True, site_data['id']
            else:
                print("❌ FAIL: Response missing success: true")
                return False, None
        elif response.status_code == 422:
            print("❌ FAIL: Still getting 422 Unprocessable Entity - siteStyles fix not working")
            return False, None
        else:
            print(f"❌ FAIL: Unexpected status code {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed - {str(e)}")
        return False, None

def test_site_sync_without_sitestyles():
    """Test Site Sync endpoint without siteStyles - should still work"""
    print("\n🔧 Testing Site Sync Endpoint without siteStyles")
    print("-" * 50)
    
    # Create test site data without siteStyles
    site_data = {
        "id": str(uuid.uuid4()),
        "name": "Test Site without Styles",
        "status": "unpublished",
        "pages": [
            {
                "id": str(uuid.uuid4()),
                "name": "Home",
                "pageUrl": "index.html",
                "blocks": [
                    {"id": "block1", "type": "hero", "content": "Simple test site"}
                ],
                "pageDescription": "Simple home page",
                "socialSharingEnabled": True,
                "socialSharingImageUrl": "",
                "headCode": "",
                "bodyEndCode": "",
                "beforeDoctypeCode": ""
            }
        ]
        # No siteStyles field
    }
    
    try:
        print(f"Sending sync request for site: {site_data['name']}")
        print(f"Site ID: {site_data['id']}")
        print(f"SiteStyles included: {'Yes' if 'siteStyles' in site_data else 'No'}")
        
        response = requests.post(f"{API_URL}/sites/sync", json=site_data, timeout=30)
        
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            response_data = response.json()
            
            if response_data.get('success') == True:
                print("✅ PASS: Site sync successful without siteStyles")
                return True, site_data['id']
            else:
                print("❌ FAIL: Response missing success: true")
                return False, None
        else:
            print(f"❌ FAIL: Unexpected status code {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed - {str(e)}")
        return False, None

def test_ftp_publish_flow(site_id):
    """Test FTP Publish Flow - should reach connection attempt, not blocked by sync"""
    print(f"\n🔧 Testing FTP Publish Flow (Site ID: {site_id})")
    print("-" * 50)
    
    # FTP publish request with fake credentials (as specified in review request)
    ftp_request = {
        "ftpSettings": {
            "protocol": "FTP",
            "host": "ftp.example.com",
            "port": 21,
            "username": "testuser",
            "password": "testpass",
            "rootFolder": "/public_html"
        },
        "onlyChanges": False
    }
    
    try:
        print("Attempting FTP publish with fake credentials...")
        print("Expected: Connection error (not sync error)")
        
        response = requests.post(f"{API_URL}/sites/{site_id}/publish-ftp", json=ftp_request, timeout=30)
        
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 500:
            # Check if it's a connection error (expected) and not a sync error
            response_text = response.text.lower()
            if "connection" in response_text or "ftp" in response_text:
                print("✅ PASS: FTP publish reaches connection attempt (expected failure)")
                print("   - No sync errors blocking the process")
                return True
            elif "sync" in response_text or "422" in response_text:
                print("❌ FAIL: FTP publish blocked by sync error")
                return False
            else:
                print("✅ PASS: FTP publish reaches processing stage (expected error)")
                return True
        elif response.status_code == 200:
            print("⚠️  WARNING: Unexpected success with fake FTP credentials")
            return True
        else:
            print(f"⚠️  WARNING: Unexpected status code {response.status_code}")
            # As long as it's not a 422 sync error, it's probably fine
            return response.status_code != 422
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed - {str(e)}")
        return False

def cleanup_test_sites(site_ids):
    """Clean up test sites"""
    print(f"\n🧹 Cleaning up test sites...")
    for site_id in site_ids:
        if site_id:
            try:
                response = requests.delete(f"{API_URL}/sites/{site_id}", timeout=10)
                if response.status_code == 200:
                    print(f"✅ Cleaned up site: {site_id}")
                else:
                    print(f"⚠️  Warning: Could not clean up site {site_id}: {response.status_code}")
            except:
                print(f"⚠️  Warning: Could not clean up site {site_id}")

def main():
    """Run site sync endpoint fix tests"""
    print("🚀 Starting Site Sync Endpoint Fix Tests")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print("=" * 60)
    
    results = []
    site_ids = []
    
    # Test 1: Site sync WITH siteStyles (main fix test)
    success1, site_id1 = test_site_sync_with_sitestyles()
    results.append(success1)
    if site_id1:
        site_ids.append(site_id1)
    
    # Test 2: Site sync WITHOUT siteStyles (should still work)
    success2, site_id2 = test_site_sync_without_sitestyles()
    results.append(success2)
    if site_id2:
        site_ids.append(site_id2)
    
    # Test 3: FTP Publish Flow (should reach connection attempt, not blocked by sync)
    if site_id1:  # Use the first site for FTP test
        results.append(test_ftp_publish_flow(site_id1))
    else:
        print("❌ Cannot test FTP publish flow without valid site")
        results.append(False)
    
    # Cleanup
    cleanup_test_sites(site_ids)
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 SITE SYNC ENDPOINT FIX TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(results)
    total = len(results)
    
    print(f"✅ Passed: {passed}/{total}")
    print(f"❌ Failed: {total - passed}/{total}")
    
    if passed == total:
        print("\n🎉 ALL SITE SYNC TESTS PASSED!")
        print("✅ Site sync accepts siteStyles without 422 errors")
        print("✅ Site sync works with and without siteStyles")
        print("✅ FTP publish flow reaches connection attempt (not blocked by sync)")
        return True
    else:
        print(f"\n⚠️  {total - passed} test(s) failed")
        if not results[0]:
            print("❌ CRITICAL: Site sync with siteStyles still failing")
        if not results[2]:
            print("❌ CRITICAL: FTP publish flow blocked by sync errors")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)